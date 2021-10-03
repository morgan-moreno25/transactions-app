import dotenv from 'dotenv';
dotenv.config();

type EnvironmentVariable = string | undefined;
type SupabaseConfig = {
	jwt_secret: string;
	url: string;
	public_key: string;
};

class Config {
	private SUPABASE_PUBLIC_KEY: EnvironmentVariable;
	private SUPABASE_URL: EnvironmentVariable;
	private SUPABASE_JWT_SECRET: EnvironmentVariable;
	private PORT: EnvironmentVariable;

	constructor() {
		this.SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;
		this.SUPABASE_URL = process.env.SUPABASE_URL;
		this.SUPABASE_PUBLIC_KEY = process.env.SUPABASE_PUBLIC_KEY;
		this.PORT = process.env.PORT;
	}

	getSupabase(): SupabaseConfig {
		return {
			jwt_secret: this.SUPABASE_JWT_SECRET as string,
			url: this.SUPABASE_URL as string,
			public_key: this.SUPABASE_PUBLIC_KEY as string,
		};
	}
	getPort(): number {
		return Number(this.PORT as string);
	}
}

export default new Config();
