import { Module } from '@nestjs/common';

import { WebPresentationModule } from './web/web.module';
import { AdminPresentationModule } from './admin/admin.module';
import { IdentityPresentationModule } from './identity/identity.module';

@Module({
    imports: [AdminPresentationModule, WebPresentationModule, IdentityPresentationModule],
})
export class PresentationModule {}