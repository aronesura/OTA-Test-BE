import { AppDataSource } from '../data-source';
import { Note } from '../entities/Note';
import { CreateNoteDto, UpdateNoteDto } from '../dtos/notes.dto';

export class NoteService {
  private noteRepository;
  constructor() {
    this.noteRepository = AppDataSource.getRepository(Note);
  }
  public createOne = async (note: CreateNoteDto) => {
    const newNote = new Note();
    newNote.title = note.title;
    newNote.body = note.body;

    return await this.noteRepository.save(newNote);
  };

  public findAll = async () => {
    return await this.noteRepository.find();
  };

  public findOneById = async (id: string) => {
    return await this.noteRepository.findOne({
      where: {
        id: id,
      },
    });
  };

  public updateOneById = async (id: string, note: UpdateNoteDto) => {
    const updatedNote = await this.noteRepository.findOne({
      where: {
        id: id,
      },
    });

    if (note.title) updatedNote!.title = note.title;
    if (note.body) updatedNote!.body = note.body;

    return await this.noteRepository.save(updatedNote!);
  };

  public deleteOneById = async (id: string) => {
    return await this.noteRepository
      .createQueryBuilder()
      .delete()
      .from(Note)
      .where('id = :id', { id: id })
      .execute();
  };
}
