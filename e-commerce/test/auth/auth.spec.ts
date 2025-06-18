import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { jestImports, jestProviders } from '../database';
import { AuthController } from '../../src/presentation/identity/auth/auth.controller';
import { GetAuthTokenUsecase } from '../../src/application/auth/use-cases/get-auth-token.usecase';
import { GetUserUsecase } from '../../src/application/auth/use-cases/get-user.usecase';
import { UserAccountMapper } from '../../src/application/auth/mappers/user-account.mapper';
import { AccessTokenMapper } from '../../src/application/auth/mappers/access-token.mapper';
import { LoginDto } from '../../src/application/auth/dtos/login.dto';
import { AuthenticationException } from '@core/exceptions/domain-exceptions';

describe('AuthController', () => {
    let controller: AuthController;
    let getAuthTokenUsecase: GetAuthTokenUsecase;
    let getUserUsecase: GetUserUsecase;
    let jwtService: JwtService;

    const userIdTest = 'a8456725-add3-4bd4-9554-f0708531e6fd';

    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...jestImports],
            controllers: [AuthController],
            providers: [
                ...jestProviders,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },

                GetAuthTokenUsecase,
                GetUserUsecase,
                UserAccountMapper,
                AccessTokenMapper,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        getAuthTokenUsecase = module.get<GetAuthTokenUsecase>(GetAuthTokenUsecase);
        getUserUsecase = module.get<GetUserUsecase>(GetUserUsecase);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('login', () => {
        it('should successfully authenticate user and return tokens', async () => {
            // Arrange
            const loginDto: LoginDto = {
                email: 'test@example.com',
                password: 'Password123!',
            };

            // Act
            const result = await controller.login(loginDto);

            // Assert
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Object);
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
        });

        it('should throw AuthenticationException when credentials are invalid', async () => {
            // Arrange
            const loginDto: LoginDto = {
                email: 'test@example.com',
                password: 'wrongpassword!',
            };

            // Act & Assert
            await expect(controller.login(loginDto)).rejects.toThrow(AuthenticationException);
        });
    });

    describe('getUser', () => {
        it('should successfully retrieve user information', async () => {
            // Act
            const result = await controller.getUser(userIdTest);

            // Assert
            expect(result).toBeDefined();
            expect(result).toBeInstanceOf(Object);
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('fullName');
        });

        it('should throw BadRequestException when user is not found', async () => {
            // Arrange
            const userId = 'nonexistent';

            // Act & Assert
            await expect(controller.getUser(userId)).rejects.toThrow();
        });
    });
});
