type Identifiable<K> = {id: K}

export interface Repository<K, V extends Identifiable<K>> {
    findAll() : V[];
    FindById(id: K) : V | undefined; 
    create(entity: V): V;
    update(entity: V): V | undefined;
    delete(id: K): V | undefined;
    count(): number;
}

interface IdGenerator<K> {
    getNextId() : K;
}

export class RepositoryInMemory<K, V extends Identifiable<K>> implements Repository<K, V> {
    entities = new Map<K, V>();
    

   constructor(private idGenerator : IdGenerator<K>){} //Constructor based Dependency injection

    findAll(): V[] {
       return Array.from(this.entities.values());
    }
    FindById(id: K): V | undefined {
        return this.entities.get(id);
    }
    create(entity: V): V {
        // ? assign unique id 
        entity.id = this.idGenerator.getNextId();
        this.entities.set(entity.id, entity);
        return entity;
    }
    update(entity: V): V | undefined {
        if(!this.FindById(entity.id)){
            return undefined;
        }
        this.entities.set(entity.id, entity);
        return entity;
    }
    delete(id: K): V | undefined {
        const old = this.FindById(id);
        if(old){
            this.entities.delete(id);
        } 
        return old;
    }
    count(): number {
        return this.entities.size;
    }

}