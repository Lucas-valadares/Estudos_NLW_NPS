import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity("surveys_users")
class SurveyUser{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    users_id: string;

    @Column()
    surveys_id: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export{ SurveyUser };