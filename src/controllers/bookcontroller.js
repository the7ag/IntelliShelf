const db = require('../config/db');

const handleControllerError = (res, error, message, statusCode = 500) => {
  console.error(`${message}:`, error);
  const errorMessage = process.env.NODE_ENV === 'production' ? message : error.message;
  res.status(statusCode).json({ message: errorMessage });
};

exports.getAllBooks = async (req, res) => {
  const userId = req.user?.id; 
  if (!userId) return res.status(401).json({ message: 'User ID missing, authorization required.' });

  try {
    const { rows } = await db.query('SELECT b.*, a.name as author_name FROM books b LEFT JOIN authors a ON b.author_id = a.id WHERE b.user_id = $1 ORDER BY b.created_at DESC', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    handleControllerError(res, error, 'Error fetching books');
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'User ID missing, authorization required.' });

  try {
    const { rows } = await db.query('SELECT b.*, a.name as author_name FROM books b LEFT JOIN authors a ON b.author_id = a.id WHERE b.id = $1 AND b.user_id = $2', [id, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Book not found or access denied' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    handleControllerError(res, error, 'Error fetching book');
  }
};

exports.createBook = async (req, res) => {
  // Add input validation here later (e.g., using express-validator)
  const { title, author_id, isbn, cover_image_url, status } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'User ID missing, authorization required.' });

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {

    const query = `
      INSERT INTO books (user_id, title, author_id, isbn, cover_image_url, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [userId, title, author_id, isbn, cover_image_url, status || 'to-read'];
    const { rows } = await db.query(query, values);
    const newBookResult = await db.query('SELECT b.*, a.name as author_name FROM books b LEFT JOIN authors a ON b.author_id = a.id WHERE b.id = $1', [rows[0].id]);
    res.status(201).json(newBookResult.rows[0]);
  } catch (error) {
    handleControllerError(res, error, 'Error creating book');
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'User ID missing, authorization required.' });

  const { title, author_id, isbn, cover_image_url, status, current_page, start_date, finish_date } = req.body;

  if (Object.keys(req.body).length === 0) {
     return res.status(400).json({ message: 'No update data provided.' });
  }

  const fields = [];
  const values = [];
  let paramIndex = 1;

  if (title !== undefined) { fields.push(`title = $${paramIndex++}`); values.push(title); }
  if (author_id !== undefined) { fields.push(`author_id = $${paramIndex++}`); values.push(author_id); }
  if (isbn !== undefined) { fields.push(`isbn = $${paramIndex++}`); values.push(isbn); }
  if (cover_image_url !== undefined) { fields.push(`cover_image_url = $${paramIndex++}`); values.push(cover_image_url); }
  if (status !== undefined) { fields.push(`status = $${paramIndex++}`); values.push(status); }
  if (current_page !== undefined) { fields.push(`current_page = $${paramIndex++}`); values.push(current_page); }
  if (start_date !== undefined) { fields.push(`start_date = $${paramIndex++}`); values.push(start_date); }
  if (finish_date !== undefined) { fields.push(`finish_date = $${paramIndex++}`); values.push(finish_date); }

  if (fields.length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
  }

  values.push(id);
  values.push(userId);
  const idParamIndex = paramIndex++;
  const userIdParamIndex = paramIndex;


  try {
    const updateQuery = `
      UPDATE books
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${idParamIndex} AND user_id = $${userIdParamIndex}
      RETURNING id;
    `; 
    const { rowCount, rows: updatedRows } = await db.query(updateQuery, values);

    if (rowCount === 0) {
      return res.status(404).json({ message: 'Book not found, access denied, or no change made' });
    }
    const updatedBookResult = await db.query('SELECT b.*, a.name as author_name FROM books b LEFT JOIN authors a ON b.author_id = a.id WHERE b.id = $1', [updatedRows[0].id]);

    res.status(200).json(updatedBookResult.rows[0]);
  } catch (error) {
    handleControllerError(res, error, 'Error updating book');
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'User ID missing, authorization required.' });

  try {
    const { rowCount } = await db.query('DELETE FROM books WHERE id = $1 AND user_id = $2', [id, userId]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Book not found or access denied' });
    }
    res.status(204).send(); 
  } catch (error) {
    handleControllerError(res, error, 'Error deleting book');
  }
};
