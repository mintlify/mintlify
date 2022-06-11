import mongoose, { Schema, Types } from 'mongoose'

export type OrgType = {
  _id: Types.ObjectId
  name: string
  subdomain: string
  createdAt: Date
  logo?: string
  favicon?: string
  integrations?: {
    slack?: {
      accessToken: string
      appId: string
      team: {
        id: string
        name: string
      }
      channel: string
      channelId: string
      configurationUrl: string
    }
    notion?: {
      access_token: string
      bot_id?: string
      workspace_id?: string
      workspace_name?: string
      workspace_icon?: string
    }
    github?: {
      installations: Object[]
    }
    google?: {
      access_token: string
      // expiry_date is the time in ms at which this token is thought to expire.
      expiry_date: number
      refresh_token: string
      token_type: string
      scope: string
    }
  }
  users: string[]
  invitedEmails?: string[]
  notifications: {
    monthlyDigest: boolean
    newsletter: boolean
  }
  access: {
    mode: string
  }
  onboarding?: {
    teamSize: string
    usingGitHub: boolean
    usingSlack: boolean
    usingNone: boolean
  }
}

const OrgSchema = new Schema({
  name: { type: String, required: true },
  subdomain: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  users: { type: [String], default: [] },
  invitedEmails: { type: [String], default: [] },
  logo: { type: String },
  favicon: { type: String },
  integrations: {
    github: Object,
    slack: {
      accessToken: { type: String },
      appId: { type: String },
      team: {
        id: { type: String },
        name: { type: String },
      },
      channel: { type: String },
      channelId: { type: String },
      configurationUrl: { type: String },
    },
    notion: {
      access_token: { type: String },
      bot_id: { type: String },
      workspace_id: { type: String },
      workspace_name: { type: String },
      workspace_icon: { type: String },
    },
    google: {
      access_token: { type: String },
      // expiry_date is the time in ms at which this token is thought to expire.
      expiry_date: { type: Number },
      refresh_token: { type: String },
      scope: { type: String },
      token_type: { type: String },
    },
  },
  notifications: {
    monthlyDigest: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: true },
  },
  access: {
    mode: { type: String, default: 'private' },
  },
  onboarding: {
    teamSize: String,
    usingGitHub: Boolean,
    usingSlack: Boolean,
    usingNone: Boolean,
  },
})

const Org = mongoose.model<OrgType>('Org', OrgSchema, 'orgs')

export default Org
