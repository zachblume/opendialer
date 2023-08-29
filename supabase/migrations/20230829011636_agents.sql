-- Add a table called agents
CREATE TABLE agents(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4()
    , created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text , now())
    , dialed_in_from varchar CHECK (length(dialed_in_from) = 10) NOT NULL
    , name text
    , current_campaign_id uuid REFERENCES campaigns(id)
);

