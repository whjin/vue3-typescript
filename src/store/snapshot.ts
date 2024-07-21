import { defineStore } from 'pinia';
import type { IndexableTypeArray } from 'dexie';
import { db, type Snapshot } from '@/utils/database';