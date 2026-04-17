import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Snippet } from './snippet.schema';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<Snippet>,
  ) {}

  async create(createSnippetDto: any) {
    const newSnippet = new this.snippetModel(createSnippetDto);
    return newSnippet.save();
  }

  async findAll(query?: string) {
    if (query) {
      return this.snippetModel
        .find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { content: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
          ],
        })
        .exec();
    }
    return this.snippetModel.find().exec();
  }

  async findOne(id: string) {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet)
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    return snippet;
  }

  async update(id: string, updateSnippetDto: any) {
    const updatedSnippet = await this.snippetModel
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();
    if (!updatedSnippet)
      throw new NotFoundException(`Snippet with ID ${id} not found`);
    return updatedSnippet;
  }

  async remove(id: string) {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Snippet with ID ${id} not found`);
    return { deleted: true };
  }
}
