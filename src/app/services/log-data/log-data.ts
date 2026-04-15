import { Injectable, inject } from '@angular/core';
/** * CRITICAL: All these must come from @angular/fire/firestore 
 * to match the instance provided in app.config.ts
 */
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  query, 
  orderBy, 
  Timestamp 
} from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';

export interface PeriodEntry {
  start: string;
  end: string;
  intensity: string;
  symptoms: string[];
  notes?: string;
  id?: string;
  timestamp?: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class LogData {
  private firestore = inject(Firestore);
  
  // We pass 'this.firestore' to ensure the collection uses the correct SDK instance
  private logCollection = collection(this.firestore, 'period-logs');

  async savePeriodEntry(entry: PeriodEntry): Promise<void> {
    try {
      await addDoc(this.logCollection, {
        ...entry,
        timestamp: Timestamp.now() 
      });
    } catch (error: any) {
      console.error("Error saving log:", error);
      throw error;
    }
  }

  getLogs(): Observable<PeriodEntry[]> {
    // Ensure 'query' and 'orderBy' are also from @angular/fire/firestore
    const q = query(this.logCollection, orderBy('timestamp', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<PeriodEntry[]>;
  }
}