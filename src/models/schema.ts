import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey(),
  author: text('author').notNull(),
  content: text('content').notNull()
});

export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  start: text('start').notNull(),
  end: text('end').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location').notNull(),
  websiteUrl: text('website_url'),
  ticketUrl: text('ticket_url'),
  imageUrl: text('image_url'),
  artistId: integer('artist_id')
});

export const eventsRelations = relations(events, 
  ({ one }) => ({
    artist: one(artists, {
      fields: [events.artistId],
      references: [artists.id]
    })
  })
);

export const artists = sqliteTable('artists', {
  id: integer('id').primaryKey(),
  name: text('name').notNull()
});

export const artistRelations = relations(artists, 
  ({ many }) => ({
    events: many(events),
  })
);