import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  solucionaHome(): string {
    return 'Veio do Service - Conceitos Manual - Solucionado';
  }
}
