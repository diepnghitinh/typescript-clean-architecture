import { Module } from '@nestjs/common';

import { WebPresentationModule } from './web/web.module';
import { AdminPresentationModule } from './admin/admin.module';

@Module({
    imports: [AdminPresentationModule, WebPresentationModule],
})
export class PresentationModule {}