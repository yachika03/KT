const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one employee by ID
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// CREATE one employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    is_active: req.body.is_active || true
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE one employee by ID
router.put('/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }

  if (req.body.email != null) {
    res.employee.email = req.body.email;
  }

  if (req.body.is_active != null) {
    res.employee.is_active = req.body.is_active;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE one employee by ID
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get employee by ID
async function getEmployee(req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.employee = employee;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
