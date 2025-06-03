import { Module } from '@nestjs/common';

import { IdentityPresentationModule } from './web/identity.module';

@Module({
    imports: [IdentityPresentationModule],
})
export class PresentationModule {}