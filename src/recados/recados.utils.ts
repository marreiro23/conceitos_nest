import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosUtils {
  inverteString(str: string) {
    // console.log('Não é Mock, é o real');
    // Luiz -> ziuL
    return str.split('').reverse().join('');
  }
  // Aqui você pode adicionar métodos utilitários relacionados aos recados, como formatação de dados, validação, etc.
}

@Injectable()
export class RecadosUtilsMock {
  inverteString() {
    // console.log('Passou pelo mock');
    return 'bbblabla';
  }

  // Aqui você pode adicionar métodos utilitários relacionados aos recados, como formatação de dados, validação, etc.
}
