import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PatientSchema = new Schema({
  name: String,
  password: String,
  email: {
    type: String,
    validation: {
      validate: (arg) => arg.test(/[a-z0-9]+@[a-z]+.[a-z]+/)
    }
  }
})

export default model('Patient', PatientSchema);