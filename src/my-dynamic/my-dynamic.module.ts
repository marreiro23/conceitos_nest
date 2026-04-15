import { DynamicModule, Module } from '@nestjs/common';

export type MyDynamicModuleConfigs = {
  apiKey: string;
  apiUrl: string;
};

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({})
export class MyDynamicModule {
  static register(myModuleConfigs: MyDynamicModuleConfigs): DynamicModule {
    // aqui eu vou usar minhas configurações.
    console.log('MyDynamicModule configs:', myModuleConfigs);

    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useFactory: async () => {
            console.log('MyDynamicModule - aqui posso ter logica');
            // Simulando uma operação assíncrona, como buscar dados de uma API externa
            await new Promise(res => setTimeout(res, 3000));
            console.log('MyDynamicModule - TERMINOU A LOGICA');
            return myModuleConfigs;
          },
        },
        // aqui eu posso ter outros providers, como serviços, repositórios, etc.
      ],
      controllers: [],
      exports: [MY_DYNAMIC_CONFIG],
    };
  }
}
