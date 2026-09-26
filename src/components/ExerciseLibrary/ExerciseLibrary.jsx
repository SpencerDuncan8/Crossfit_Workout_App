// src/components/ExerciseLibrary/ExerciseLibrary.jsx

import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getAllExercisesCombined, searchAllExercises, getExerciseCategories } from '../../data/exerciseDatabase.js';
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Modal from '../Common/Modal.jsx';
import QuickAddExerciseModal from '../Common/QuickAddExerciseModal.jsx';
import './ExerciseLibrary.css';

const ExerciseLibrary = () => {
  const { appState, openExerciseModal, updateCustomExercise, deleteCustomExercise, updateAppState } = useContext(AppStateContext);
  const customExercises = appState.customExercises || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [deletingExercise, setDeletingExercise] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSetup, setEditSetup] = useState('');
  const [editExecution, setEditExecution] = useState('');
  const [editCommonMistakes, setEditCommonMistakes] = useState('');
  const [editEasier, setEditEasier] = useState('');
  const [editHarder, setEditHarder] = useState('');

  const categories = useMemo(() => {
    const builtIn = getExerciseCategories();
    const custom = customExercises.map(ex => ex.category).filter(Boolean);
    return Array.from(new Set([...builtIn, ...custom])).sort();
  }, [customExercises]);

  const displayedExercises = useMemo(() => {
    let list = searchTerm.trim().length > 0
      ? searchAllExercises(searchTerm, customExercises)
      : getAllExercisesCombined(customExercises);

    if (activeCategory) {
      list = list.filter(ex => ex.category === activeCategory);
    }
    return list;
  }, [searchTerm, activeCategory, customExercises]);

  const openEditFormFor = (exercise) => {
    setEditingExercise(exercise);
    setEditName(exercise.name);
    setEditCategory(exercise.category || categories[0] || 'Other');
    setEditSetup((exercise.setup || []).join('\n'));
    setEditExecution((exercise.execution || []).join('\n'));
    setEditCommonMistakes((exercise.commonMistakes || []).join('\n'));
    setEditEasier(exercise.modifications?.easier || '');
    setEditHarder(exercise.modifications?.harder || '');
  };

  // Picks up requests from the exercise detail modal's "Add Details" button
  // (which sets appState.pendingExerciseEditId and switches to this tab).
  useEffect(() => {
    if (appState.pendingExerciseEditId) {
      const exerciseToEdit = customExercises.find(ex => ex.id === appState.pendingExerciseEditId);
      if (exerciseToEdit) {
        openEditFormFor(exerciseToEdit);
      }
      updateAppState({ pendingExerciseEditId: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.pendingExerciseEditId, customExercises]);

  const handleCardClick = (exercise) => {
    openExerciseModal(exercise.id);
  };

  const handleEditClick = (e, exercise) => {
    e.stopPropagation();
    openEditFormFor(exercise);
  };

  const handleDeleteClick = (e, exercise) => {
    e.stopPropagation();
    setDeletingExercise(exercise);
  };

  const handleSaveEdit = () => {
    const trimmedName = editName.trim();
    if (!trimmedName || !editingExercise) return;
    updateCustomExercise(editingExercise.id, {
      name: trimmedName,
      category: editCategory,
      setup: editSetup.split('\n'),
      execution: editExecution.split('\n'),
      commonMistakes: editCommonMistakes.split('\n'),
      modifications: { easier: editEasier, harder: editHarder },
    });
    setEditingExercise(null);
  };

  const handleConfirmDelete = () => {
    if (deletingExercise) {
      deleteCustomExercise(deletingExercise.id);
      setDeletingExercise(null);
    }
  };

  return (
    <>
      <div className="page-header" style={{ marginTop: '24px' }}>
        <div className="library-header">
          <h2>Exercises</h2>
          <button className="filter-open-btn" onClick={() => setShowAddModal(true)}>
            <PlusCircle size={16} />
            New Exercise
          </button>
        </div>
        <p>Browse the exercise library or add your own custom movements.</p>
      </div>

      <div className="exercise-search-bar">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="exercise-category-chips">
        <button
          className={`exercise-chip ${activeCategory === null ? 'active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`exercise-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="exercise-library-list">
        {displayedExercises.map(exercise => (
          <div key={exercise.id} className="exercise-library-card" onClick={() => handleCardClick(exercise)}>
            <span className="exercise-library-card-dot" />
            <div className="exercise-library-card-info">
              <h4>{exercise.name}</h4>
              <span className="exercise-library-card-category">{exercise.category}</span>
            </div>
            {exercise.isCustom && (
              <div className="exercise-library-card-actions">
                <button className="exercise-card-icon-btn" onClick={(e) => handleEditClick(e, exercise)}>
                  <Pencil size={16} />
                </button>
                <button className="exercise-card-icon-btn danger" onClick={(e) => handleDeleteClick(e, exercise)}>
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
        {displayedExercises.length === 0 && (
          <div className="no-templates-found">
            <h4>No Exercises Found</h4>
            <p>Try a different search, or add your own custom exercise.</p>
          </div>
        )}
      </div>

      <QuickAddExerciseModal
        isOpen={showAddModal}
        initialName=""
        onClose={() => setShowAddModal(false)}
        onCreated={() => setShowAddModal(false)}
      />

      <Modal isOpen={!!editingExercise} onClose={() => setEditingExercise(null)} title="Edit Exercise">
        <div className="modal-form-container">
          <div>
            <label className="modal-label">Exercise Name</label>
            <input
              type="text"
              className="modal-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div>
            <label className="modal-label">Category</label>
            <select className="modal-input" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="modal-label">Setup <span className="modal-label-hint">(one step per line, optional)</span></label>
            <textarea
              className="modal-input"
              rows={3}
              value={editSetup}
              onChange={(e) => setEditSetup(e.target.value)}
              placeholder={"e.g.\nStart in plank position\nHands under shoulders"}
            />
          </div>

          <div>
            <label className="modal-label">Execution <span className="modal-label-hint">(one step per line, optional)</span></label>
            <textarea
              className="modal-input"
              rows={3}
              value={editExecution}
              onChange={(e) => setEditExecution(e.target.value)}
              placeholder={"e.g.\nLower with control\nDrive back up explosively"}
            />
          </div>

          <div>
            <label className="modal-label">Common Mistakes <span className="modal-label-hint">(one per line, optional)</span></label>
            <textarea
              className="modal-input"
              rows={3}
              value={editCommonMistakes}
              onChange={(e) => setEditCommonMistakes(e.target.value)}
              placeholder={"e.g.\nLosing core stability"}
            />
          </div>

          <div>
            <label className="modal-label">Modifications <span className="modal-label-hint">(optional)</span></label>
            <input
              type="text"
              className="modal-input"
              style={{ marginBottom: '8px' }}
              value={editEasier}
              onChange={(e) => setEditEasier(e.target.value)}
              placeholder="Easier variation"
            />
            <input
              type="text"
              className="modal-input"
              value={editHarder}
              onChange={(e) => setEditHarder(e.target.value)}
              placeholder="Harder variation"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setEditingExercise(null)}>Cancel</button>
            <button type="button" className="action-btn schedule-btn" onClick={handleSaveEdit} disabled={!editName.trim()}>
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deletingExercise} onClose={() => setDeletingExercise(null)} title="Delete Exercise">
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            Delete "{deletingExercise?.name}"? Existing workouts that use it will keep the name, but it will no longer be trackable or clickable.
          </p>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setDeletingExercise(null)}>Cancel</button>
            <button type="button" className="action-btn danger-btn" onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExerciseLibrary;