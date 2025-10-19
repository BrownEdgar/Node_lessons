'use strict';

const elements = {
  deleteButtons: document.querySelectorAll('[name="deleteButton"]'),
  editButtons: document.querySelectorAll('[name="editButton"]'),
  closeButton: document.querySelector('[name="closeButton"]'),
  deleteAllButton: document.querySelector('[name="deleteAllButton"]'),
  dialog: document.querySelector('dialog'),
  form: document.forms[0],
  selectBar: document.querySelector('[name="sort"]'),
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = Object.fromEntries(new FormData(e.target));

  try {
    const response = await fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    elements.dialog.close();
    window.location.reload();
  } catch (err) {
    throw new Error(err);
  }
};

const handleOpenDialog = (e) => {
  if (e.target.name !== 'editButton') return;

  const { date, password, ...user } = JSON.parse(e.target.dataset.user);
  const userKeys = Object.keys(user);

  userKeys.forEach((key) => {
    elements.form[key].value = user[key];
  });

  elements.dialog.showModal();
  document.body.style.overflow = 'hidden';
};

const handleCloseDialog = (e) => {
  elements.dialog.close();
  document.body.style.overflow = '';
};

const handleDelete = async (e) => {
  console.log(e.target);
  if (e.target.name !== 'deleteButton') return;

  const dynamicId = e.target.dataset.id;

  try {
    await fetch(`/users/${dynamicId}`, { method: 'DELETE' });

    window.location.reload();
  } catch (err) {
    throw new Error(err);
  }
};

const handleClearAll = async (e) => {
  try {
    const response = await fetch('/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    window.location.reload();
  } catch (err) {
    throw new Error(err);
  }
};

const handleSort = async (e) => {
  try {
    await fetch(`/users?${e.target.name}=${e.target.value}`);
    window.location.reload();
  } catch (err) {
    throw new Error(err);
  }
};

// EVENT LISTENERS

elements.deleteButtons.forEach((button) =>
  button.addEventListener('click', (e) => handleDelete(e))
);

elements.editButtons.forEach((button) =>
  button.addEventListener('click', (e) => handleOpenDialog(e))
);

elements.closeButton.addEventListener('click', (e) => handleCloseDialog(e));

elements.dialog.addEventListener('submit', (e) => handleSubmit(e));

elements.deleteAllButton.addEventListener('click', (e) => handleClearAll(e));

elements.selectBar.addEventListener('change', (e) => handleSort(e));
