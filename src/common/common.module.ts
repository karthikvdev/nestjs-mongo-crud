import { Module } from '@nestjs/common';
import { CommonService } from './common.controller';

@Module({
    providers: [CommonService]
})
export class CommonModule { }
