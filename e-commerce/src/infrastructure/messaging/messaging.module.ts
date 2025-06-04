
import {Global, Logger, Module, Provider} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { BusTransit } from 'nestjs-bustransit';

const configService = new ConfigService();

@Global()
@Module({
    imports: [
        BusTransit.AddBusTransit.setUp((x) => {

            x.UsingRabbitMq(configService.get('APP_NAME'), (context, cfg) =>
            {
                cfg.PrefetchCount = 50;

                cfg.Host(configService.get('RMQ_HOST'), configService.get('RMQ_VHOST'), (h) =>
                {
                    h.Username(configService.get('RMQ_USERNAME'));
                    h.Password(configService.get('RMQ_PASSWORD'));
                });

            });

        })
    ],
    controllers: [
    ],
    providers: [
    ],
})
export class MessagingInfrastructureModule {}