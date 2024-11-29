import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../common/enums/users.enum';
import * as bcrypt from 'bcrypt';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  adress: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.PARTICIPANT })
  role: UserRole;

  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); 
  }
  next();
});