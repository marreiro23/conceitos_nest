import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  solucionarConceitosAutomatico(): string {
    return 'Veio do Service - (ConceitosAutomaticoService))';
  }
}
