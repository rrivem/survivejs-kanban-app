import assert from 'assert';
import NoteActions from '../app/actions/NoteActions';
import NoteStore from '../app/stores/NoteStore';
import alt from '../app/libs/alt';

describe('NoteStore', () => {
    beforeEach(() => {
        alt.flush();
    });

    const task = 'test';

    it('creates notes', () => {
        NoteActions.create({ task });

        const state = NoteStore.getState();
        assert.equal(state.notes.length, 1);
        assert.equal(state.notes[0].task, task);
    });

    it('updates notes', () => {
        const updatedTask = 'test 2';

        NoteActions.create({ task });

        const note = NoteStore.getState().notes[0];

        NoteActions.update({...note, task: updatedTask });

        const state = NoteStore.getState();
        assert.equal(state.notes.length, 1);
        assert.equal(state.notes[0].task, updatedTask);
    });

    it('deletes notes', () => {
        NoteActions.create({ task });

        const note = NoteStore.getState().notes[0];

        NoteActions.delete(note.id);

        const state = NoteStore.getState();

        assert.equal(state.notes.length, 0);
    });

    it('gets notes', () => {
        NoteActions.create({ task });

        const note = NoteStore.getState().notes[0];
        const notes = NoteStore.getNotesByIds([note.id]);

        assert.equal(notes.length, 1);
        assert.equal(notes[0].task, task);
    });
});