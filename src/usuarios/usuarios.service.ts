import { ConflictException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as argon2 from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schema/usuarioSchema';
import { Model, Types } from 'mongoose';
import { flagE } from 'src/core/enum/FlagEnum';


@Injectable()
export class UsuariosService {
  private readonly opcionesArgon2: argon2.Options = {
    type: argon2.argon2id,
    timeCost: 6,
    memoryCost: 2 ** 16,
    parallelism: 1,
    hashLength: 50,
  };
  constructor(
    @InjectModel(Usuario.name) private readonly usuario: Model<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const username = await this.usuario.findOne({
      username: createUsuarioDto.username,
      flag: flagE.nuevo,
    });
    if (username) {
      throw new ConflictException('El usuario ya existe ');
    }
    createUsuarioDto.password = await argon2.hash(
      createUsuarioDto.password,
      this.opcionesArgon2,
    );
    await this.usuario.create(createUsuarioDto);
    return { status: HttpStatus.CREATED };
  }




  async buscarUsuario(username:string){
    const usuario = await this.usuario.findOne({username:username}).select('+password')    
    return usuario
  }

  async findAll() {
    const usuarios = await this.usuario.find({flag:flagE.nuevo  })
    return usuarios;
  }



  async softDelete(id: Types.ObjectId) {
      const user = await this.usuario.findOne({_id:new Types.ObjectId(id)})
      if(!user){
        throw new NotAcceptableException();
      }
      await this.usuario.updateOne({_id:new Types.ObjectId(id)},{flag:flagE.eliminado})
      return {status:HttpStatus.OK}
  }
}
