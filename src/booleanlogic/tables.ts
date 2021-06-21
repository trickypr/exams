const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

export class TruthTable {
    conditions = 0
    
    constructor(conditions: number) {
        this.conditions = conditions
    }

    evaluate(str: string, toEval: (...conditions: boolean[]) => boolean): string {
        const options = 2 ** this.conditions

        let htmlTable = '<table><tr>'

        new Array(this.conditions).fill(false).forEach((_a, i) => {
            htmlTable += `<th>${alphabet[i]}</th>`
        })

        htmlTable += `<th>${str}</th>`

        htmlTable += '</tr>'

        for (let i = 0; i < options; i++) {
            htmlTable += '<tr>'

            const bin = this.toBoolArray(i, this.conditions)

            bin.forEach(v => htmlTable += `<td>${v}</td>`)
            htmlTable += `<td>${toEval(...bin)}</td>`
            
            htmlTable += '</tr>'
        }

        htmlTable += '</table>'

        return htmlTable
    }

    private toBoolArray(int: number, padding: number): boolean[] {
        return Array.from((int >>> 0).toString(2).padStart(padding, '0'), v => Boolean(Number(v)))
    }
}