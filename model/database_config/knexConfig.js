const casa = true;

if (casa == true) {
    module.exports = {
        development: {
            // ⚠️ ALTERAÇÃO: Define o cliente como 'mysql2'
            client: 'mysql2',
            connection: {
                host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
                user: '32VK7xYo1aqbosn.root', // Substitua pelo seu usuário
                password: 'l0RHVm1CiJtW4SHb', // Substitua pela sua senha
                database: 'db_super_filmes',
                port: 4000, // Porta padrão do MySQL

                // Opcional: Define charset (recomendado para UTF8)
                charset: 'utf8mb4',

                ssl: {
                    minVersion: 'TLSv1.2',
                    rejectUnauthorized: true
                }
            },

            // Configurações de Migração
            migrations: {
                tableName: 'knex_migrations', // Nome da tabela de migrações
                directory: './db/migrations'
            },
            seeds: {
                directory: './db/seeds'
            }
        }
    }
} else {
    module.exports = {
        development: {
            // ⚠️ ALTERAÇÃO: Define o cliente como 'mysql2'
            client: 'mysql2',
            connection: {
                host: 'localhost',
                user: 'root', // Substitua pelo seu usuário
                password: 'bcd127', // Substitua pela sua senha
                database: 'db_filmes_20261_b',
                port: 3306, // Porta padrão do MySQL

                // Opcional: Define charset (recomendado para UTF8)
                charset: 'utf8mb4'
            },

            // Configurações de Migração
            migrations: {
                tableName: 'knex_migrations', // Nome da tabela de migrações
                directory: './db/migrations'
            },
            seeds: {
                directory: './db/seeds'
            }
        }
        // Você pode adicionar configurações para produção, testes, etc.
    };
}