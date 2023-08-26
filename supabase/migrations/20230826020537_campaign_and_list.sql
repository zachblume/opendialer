-- Create a table for the campaign and phone_numbers tables
CREATE TABLE campaigns(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4()
    , created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , name text NOT NULL
    , description text
    , status text NOT NULL
);

CREATE TABLE people(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4()
    , created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , first_name text NOT NULL
    , last_name text NOT NULL
    , phone_number varchar CHECK (length(phone_number) = 10) NOT NULL
    , campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE
    , fields jsonb NOT NULL
);

