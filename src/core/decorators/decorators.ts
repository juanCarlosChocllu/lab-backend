import { SetMetadata } from "@nestjs/common"
import { LLAVE_PUBLICA } from "../constants/constants"

export const PUBLICO =() => SetMetadata(LLAVE_PUBLICA, true)