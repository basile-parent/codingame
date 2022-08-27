import * as fs from "fs"
import * as path from "path"

const DIR_PATH = "../../save"

abstract class PersistentObject {
    private saveFileName: string

    constructor(saveFileName) {
        this.saveFileName = saveFileName
    }

    load(): boolean {
        try {
            const json: string = fs.readFileSync(path.resolve(`${__dirname}/${DIR_PATH}/${ this.saveFileName }.json`), 'utf8')
            this.loadFromJson(JSON.parse(json))
        } catch (e) {
            console.error("Cannot find game save file", e)
            return false
        }

        return true
    }

    save() {
        try {
            fs.writeFileSync(
                path.resolve(`${__dirname}/${DIR_PATH}/${ this.saveFileName }.json`),
                JSON.stringify(this.toJson()),
                'utf8')
        } catch (e) {
            console.error("Error while saving game save file", e)
        }
    }

    abstract toJson(): PersistentObject
    abstract loadFromJson(jsonObject: object)
}

export default PersistentObject