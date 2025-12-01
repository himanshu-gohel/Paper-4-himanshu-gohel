const express = require('express');
const Post = require('../models/post');
const User = require('../models/user')
const PostVersion = require('../models/postVersion');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  const { title, content, image, categories, tags } = req.body;
  const post = await Post.create({ title, content, image, categories, tags, authorId: req.user.id });
  res.json(post);
});

// Read all
// Read all (with archive filter)
router.get('/', async (req, res) => {
  const { archived } = req.query;
  let where = {};
  if (archived === 'true') {
    where.isDeleted = true;
  } else {
    where.isDeleted = false;
  }
  const posts = await Post.findAll({
    where,
    include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
  });
  res.json(posts);
});

// Read one
router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
  });
  res.json(post);
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await PostVersion.create({
      postId: post.id,
      title: post.title,
      content: post.content,
      image: post.image,
      categories: post.categories,
      tags: post.tags,
    });

    const { title, content, image, categories, tags } = req.body;
    await post.update({ title, content, image, categories, tags });

    res.json(post);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete (hard delete)
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  await post.destroy();
  res.json({ message: 'Post deleted' });
});

// Archive (soft delete)
router.patch('/:id/archive', auth, async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  await post.update({ isDeleted: true });
  res.json({ message: 'Post archived' });
});

// Versions
router.get('/:id/versions', auth, async (req, res) => {
  const versions = await PostVersion.findAll({ where: { postId: req.params.id } });
  res.json(versions);
});

// Image upload
router.post('/upload', auth, upload.single('file'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

// GET /api/posts?q=search&page=1&limit=10&archived=false
router.get('/', async (req, res) => {
  const { q, page = 1, limit = 10, archived } = req.query;
  const where = {};

  // Archive filter
  if (archived === 'true') where.isDeleted = true;
  else where.isDeleted = false;

  // Search filter (title or content)
  if (q) {
    where[Sequelize.Op.or] = [
      { title: { [Sequelize.Op.like]: `%${q}%` } },
      { content: { [Sequelize.Op.like]: `%${q}%` } }
    ];
  }

  // Pagination
  const offset = (parseInt(page) - 1) * parseInt(limit);

  const { count, rows } = await Post.findAndCountAll({
    where,
    include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
    limit: parseInt(limit),
    offset,
    order: [['createdAt', 'DESC']]
  });

  res.json({
    posts: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit)
  });
});

module.exports = router;