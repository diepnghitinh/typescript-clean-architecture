import { Module } from '@nestjs/common';

import { IdentityPresentationModule } from './web/web.module';

@Module({
    imports: [IdentityPresentationModule],
})
export class PresentationModule {}