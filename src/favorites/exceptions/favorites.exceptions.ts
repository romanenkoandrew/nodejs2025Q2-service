import { HttpException, HttpStatus } from '@nestjs/common';

export class FavoritesUnprocessableEntityException extends HttpException {
  constructor(message: string, id: string) {
    super(
      `${message} with ID ${id} not found`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
