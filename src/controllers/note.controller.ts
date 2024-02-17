import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { CreateNoteDto, UpdateNoteDto } from '../dtos/notes.dto';
import { NoteService } from '../services/note.service';

class NoteController {
  private noteService;
  constructor() {
    this.noteService = new NoteService();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const createNoteDto = new CreateNoteDto();
      createNoteDto.title = req.body.title;
      createNoteDto.body = req.body.body;

      const errors = await validate(createNoteDto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const newNote = await this.noteService.createOne(createNoteDto);

      res.status(200).json({ data: newNote });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const notes = await this.noteService.findAll();

      res.status(200).json({ data: notes });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

  public findOneById = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.params?.id) {
        res.status(400).json({ error: 'Please provide correct note_id' });
      }
      const note = await this.noteService.findOneById(req.params.id);

      res.status(200).json({ data: note });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

  public updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.params?.id) {
        res.status(400).json({ error: 'Please provide correct note_id' });
      }

      const updateNoteDto = new UpdateNoteDto();
      updateNoteDto.title = req.body.title;
      updateNoteDto.body = req.body.body;

      const errors = await validate(updateNoteDto);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const updatedNote = await this.noteService.updateOneById(req.params.id, updateNoteDto);

      res.status(200).json({ data: updatedNote });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };

  public deleteOneById = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.params?.id) {
        res.status(400).json({ error: 'Please provide correct note_id' });
      }
      await this.noteService.deleteOneById(req.params.id);

      res.status(200).json({ msg: 'Successfully deleted!' });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  };
}

export default NoteController;
