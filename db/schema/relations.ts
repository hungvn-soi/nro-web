import { relations } from "drizzle-orm";

import { account } from "./account";
import { player } from "./player";

export const accountRelations = relations(account, ({ many }) => ({
    players: many(player),
}));

export const playerRelations = relations(player, ({ one }) => ({
    account: one(account, {
        fields: [player.accountId],
        references: [account.id],
    }),
}));