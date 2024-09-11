export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      division_players: {
        Row: {
          division_id: string
          id: string
          player_id: string
        }
        Insert: {
          division_id: string
          id?: string
          player_id: string
        }
        Update: {
          division_id?: string
          id?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "division_players_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_players_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "players_in_division"
            referencedColumns: ["division_id"]
          },
          {
            foreignKeyName: "division_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "division_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players_in_division"
            referencedColumns: ["player_id"]
          },
        ]
      }
      divisions: {
        Row: {
          created_at: string | null
          game_id: string | null
          id: string
          number: number
          season_id: string | null
        }
        Insert: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          number?: number
          season_id?: string | null
        }
        Update: {
          created_at?: string | null
          game_id?: string | null
          id?: string
          number?: number
          season_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "divisions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "divisions_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      fixtures: {
        Row: {
          away_player: string
          away_score: number | null
          date_completed: string | null
          division_id: string | null
          home_player: string
          home_score: number | null
          id: string
          season_id: string | null
        }
        Insert: {
          away_player: string
          away_score?: number | null
          date_completed?: string | null
          division_id?: string | null
          home_player: string
          home_score?: number | null
          id?: string
          season_id?: string | null
        }
        Update: {
          away_player?: string
          away_score?: number | null
          date_completed?: string | null
          division_id?: string | null
          home_player?: string
          home_score?: number | null
          id?: string
          season_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixtures_away_player_fkey"
            columns: ["away_player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_away_player_fkey"
            columns: ["away_player"]
            isOneToOne: false
            referencedRelation: "players_in_division"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "fixtures_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "players_in_division"
            referencedColumns: ["division_id"]
          },
          {
            foreignKeyName: "fixtures_home_player_fkey"
            columns: ["home_player"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_home_player_fkey"
            columns: ["home_player"]
            isOneToOne: false
            referencedRelation: "players_in_division"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "fixtures_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      players: {
        Row: {
          avatar: string | null
          id: string
          name: string
        }
        Insert: {
          avatar?: string | null
          id?: string
          name: string
        }
        Update: {
          avatar?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string
          game_id: string
          id: string
          number: number
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          number?: number
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          number?: number
        }
        Relationships: [
          {
            foreignKeyName: "seasons_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      players_in_division: {
        Row: {
          division_id: string | null
          player_avatar: string | null
          player_id: string | null
          player_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
