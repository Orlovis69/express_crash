const express = require('express');
const router = express.Router();
const uuid = require('uuid');
// Import hardcoded file with members
const members = require('../../Members');

// Get all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  // Checking if member exists
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    return res.json(
      members.filter(member => member.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  // Check if email and name provided
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please provide a name and email' });
  }

  // Add member to array
  members.push(newMember);
  // res.json(members);

  // Redirect
  res.redirect('/');
});

// Update a member
router.put('/:id', (req, res) => {
  // Checking if member exists
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;

    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;
        // Sending response
        res.json({ msg: 'Member was updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

// Delete single member
router.delete('/:id', (req, res) => {
  // Checking if member exists
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    return res.json({
      msg: `Member with id of ${req.params.id} was deleted`,
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with id of ${req.params.id}` });
  }
});

module.exports = router;
