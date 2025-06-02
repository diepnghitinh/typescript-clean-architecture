/* eslint-disable @typescript-eslint/no-require-imports */
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({
    baseDirectory: path.resolve(), // Thư mục gốc
});

module.exports = [
    {
        files: ['**/*.ts'], // Áp dụng cho các file TypeScript
        languageOptions: {
            parser: require('@typescript-eslint/parser'), // Parser cho TypeScript
            parserOptions: {
                ecmaVersion: 2021, // Sử dụng chuẩn ECMAScript 2021
                sourceType: 'module', // Sử dụng module import/export
                project: './tsconfig.json', // Đường dẫn tới tsconfig
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            prettier: require('eslint-plugin-prettier'),
            import: require('eslint-plugin-import'),
        },
        rules: {
            // Prettier
            'prettier/prettier': 'error', // Bắt buộc tuân theo định dạng của Prettier

            // Quy tắc chung
            'no-console': ['warn', { allow: ['warn', 'error'] }], // Cảnh báo khi sử dụng console.log
            'no-unused-vars': 'off', // Tắt mặc định, thay bằng @typescript-eslint
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ], // Cho phép biến bắt đầu bằng _ không bị báo lỗi

            // Quy tắc TypeScript
            '@typescript-eslint/no-require-imports': 'off', //
            '@typescript-eslint/explicit-function-return-type': 'off', // Không bắt buộc khai báo kiểu trả về
            '@typescript-eslint/ban-ts-comment': 'warn', // Cảnh báo khi sử dụng @ts-ignore
            '@typescript-eslint/no-explicit-any': 'off', // TODO: Tạm thời sẽ không bắt rule sử dụng any ( sẽ cải thiện sau )
            '@typescript-eslint/no-inferrable-types': 'off', // Cho phép khai báo kiểu rõ ràng cho biến đơn giản
            '@typescript-eslint/no-empty-function': 'warn', // Cảnh báo với các hàm trống
            '@typescript-eslint/no-namespace': 'off', // Cho phép sử dụng namespace
            '@typescript-eslint/explicit-member-accessibility': [
                'warn', // Cảnh báo với các method và property không có access modifier
                {
                    overrides: {
                        constructors: 'no-public', // Không yêu cầu public cho constructor
                        properties: 'no-public', // Không yêu cầu public cho property
                    },
                },
            ], // Yêu cầu khai báo access modifier cho các method và property

            // Quy tắc import/export
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ], // Quy định thứ tự import
            'import/newline-after-import': 'error', // Yêu cầu dòng trống sau import
            'import/no-default-export': 'error', // Khuyến khích sử dụng export tên thay vì export mặc định

            // Cấu trúc code
            'max-lines-per-function': [
                'error',
                {
                    max: 100, // Giới hạn số dòng tối đa (thay đổi giá trị tùy nhu cầu)
                    skipComments: true, // Bỏ qua các dòng là comment
                    skipBlankLines: true, // Bỏ qua các dòng trống
                },
            ], // Giới hạn số dòng trong mỗi function
            'max-depth': ['error', 4], // Giới hạn độ sâu của câu lệnh
            'max-len': ['error', { code: 100 }], // Giới hạn độ dài dòng
            'no-multiple-empty-lines': ['error', { max: 1 }], // Không cho phép nhiều dòng trống
            'lines-between-class-members': ['error', 'always'], // Dòng trống giữa các thành phần trong class

            // Khác
            eqeqeq: ['error', 'always'], // Yêu cầu sử dụng === thay vì ==
            curly: ['error', 'all'], // Yêu cầu sử dụng {} với các câu lệnh điều kiện
            'arrow-body-style': ['error', 'as-needed'], // Tối ưu cú pháp arrow function
            'no-var': 'error', // Không cho phép sử dụng var
            'prefer-const': 'error', // Yêu cầu sử dụng const thay vì let nếu biến không thay đổi
            'prefer-arrow-callback': 'error', // Ưu tiên sử dụng arrow function trong callback
        },
        ignores: ['node_modules', 'dist', 'coverage', 'eslint.config.js'], // Loại trừ các thư mục không cần lint
    },

    // Cấu hình cho file test
    {
        files: ['**/*.spec.ts', '**/*.test.ts'], // Quy tắc riêng cho file test
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 'latest',
            },
            globals: {
                jest: true, // Kích hoạt môi trường Jest
            },
        },
        plugins: {
            jest: require('eslint-plugin-jest'),
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off', // Cho phép sử dụng any trong test
        },
    },

    // Tích hợp cấu hình cũ nếu cần
    ...compat.config({
        extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    }),
];
