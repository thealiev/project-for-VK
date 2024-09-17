import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cat } from '../cats/cat.entity'; // Adjust the path if needed

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cat, { eager: true }) // Ensure you have a Cat entity defined
  cat: Cat;

  @Column()
  userId: string;
}
