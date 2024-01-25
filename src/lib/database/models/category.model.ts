import { ICategory } from "@/types/model";
import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
