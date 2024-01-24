import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";
import './AddInfo.css';
const AddInfo = () => {
    const [tid, setID] = useState('');
    const [name, setName] = useState("");
    const [pos, setPos] = useState(3);
   

    const subdata = [
        {
            year: 'SE1',
            sem: 1,
            subject: ["DM", "LDCO", "DSA", "OOPS", "BCN"]
        },
        {
            year: 'SE2',
            sem: 2,
            subject: ["EM-3", "PA", "DBMS", "CG", "SE"]
        },
        {
            year: 'TE1',
            sem: 1,
            subject: ["TOC", "OS", "HCI", "ML", "ELECTIVE-1"]
        },
        {
            year: 'TE2',
            sem: 2,
            subject: ["CNS", "DSBDA", "WAD", "ELECTIVE-2"]
        },
        {
            year: 'BE1',
            sem: 1,
            subject: ["ISR", "SPM", "DL", "ELECTIVE-3", "ELECTIVE-4"]
        },
        {
            year: 'BE2',
            sem: 2,
            subject: ["DS", "ELECTIVE-5", "ELECTIVE-6"]
        }
    ]


    const [sub, setsub] = useState([]);
    const [lect, setLect] = useState([
        { year: '', sem: 1, div: 0, sub: '', subList: [] },
    ]);

    const [lab, setLab] = useState([
        { year: 2, div: 9, batch: 'K', lab: '' },
    ]);

    const addSubject = (event, index) => {
        let data = [...lect];
        lect[index][event.target.name] = event.target.value;
        setLect(data);
    }

    const changeSub = (index) => {
        const selectedYear = lect[index]['year'];
        const selectedSem = lect[index]['sem'];

        const subjects = subdata.find((item) => item.year === selectedYear && item.sem === selectedSem);

        const data = [...lect];
        data[index]['subList'] = subjects ? subjects.subject : [];
        setLect(data);
    }

    const remSubject = (index) => {
        let data = [...lect];
        data.splice(index, 1);
        setLect(data);
    }

    const addNewSubs = () => {
        let data = { year: 2, div: 9, sub: '', subList: [] };
        setLect([...lect, data]);
    }

    const addLab = (event, index) => {
        let data = [...lab];
        lab[index][event.target.name] = event.target.value;
        setLab(data);
    }

    const remlab = (index) => {
        let data = [...lab];
        data.splice(index, 1);
        setLab(data);
    }

    const addNewLabs = () => {
        let data = { year: 2, div: 9, batch: 'K', lab: '' };
        setLab([...lab, data]);
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(tid, name, pos, lect, lab);
    };

    return (
        <div className=" rounded-md">
        <h1 className="text-2xl font-bold ">AddInfo</h1>
            <div className="Tdetails">
                <form onSubmit={(event) => { submit(event) }}>
                    <ul>
                    <li className="flex items-center space-x-4">
                            <label>Teacher Id :</label>
                            <input
                                type="number" required
                                value={tid}
                                onChange={(e) => setID(e.target.value)}
                                placeholder=" Enter Id "
                                className="w-3/4 border p-2 rounded-md"
                            />
                        </li>
                        <li className="flex items-center space-x-4">
                            <label >Name :</label>
                            <input
                                type="text" required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=" Enter Name"
                                className="w-3/4 border p-2 rounded-md"
                            />
                        </li>
                        <li className="flex items-center space-x-4">
                            <label  className="w-1/4">Position :</label>
                            <select value={pos} onChange={(e) => setPos(e.target.value)} className="w-3/4 border p-2 rounded-md">
                                <option value="1">Proffesor</option>
                                <option value="2">Associate</option>
                                <option value="3">Assistant</option>
                                
                            </select>
                        </li>

                        <label className="block">Add Subjects :</label>
                        {lect.map((form, index) => {
                            return (
                                <li key={index} className="flex items-center space-x-4">
                                    <select placeholder="Enter Year" name='year' value={form.year} onChange={(event) => { addSubject(event, index); changeSub(index) }}
                                    className="border p-2 rounded-md"   
                                    >
                                        {subdata.map((subdata) => {
                                            return (
                                                <option value={subdata.year}>{subdata.year}</option>
                                            )
                                        })}
                                    </select>
                                    <select placeholder="Enter SEM" name='sem' value={form.sem} onChange={(event) => { addSubject(event, index); changeSub(index) }}
                                    className="border p-2 rounded-md" 
                                    >
                                        <option value={1}>SEM 1</option>
                                        <option value={2}>Sem 2</option>
                                    </select>
                                    <select placeholder="Enter Division" name='div' value={form.div} onChange={(event) => addSubject(event, index)}
                                    className="border p-2 rounded-md" 
                                    >
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                    </select>
                                    <select name='sub' value={form.sub} onChange={(event) => addSubject(event, index)}
                                    className="border p-2 rounded-md" 
                                    >
                                        {sub.map((subdata) => {
                                            return (
                                                <option value={subdata}>{subdata}</option>
                                            )
                                        })}
                                    </select>
                                    { <button onClick={() => { remSubject(index) }} className="text-red-500"><IoRemoveCircleOutline size={30} /></button>}
                                </li>
                            )
                        })}

                        <li >
                        <button onClick={() => { addNewSubs() }} className=" bg-green-500 text-white p-1 rounded-md"><IoIosAddCircleOutline size={30} /></button>

                        </li>

                        <label className="block">Add Labs :</label>
                        {lab.map((form, index) => {
                            return (
                                <li key={index} className="flex items-center space-x-4">
                                    <select name='year' value={form.year} onChange={(event) => addLab(event, index)} className="border p-2 rounded-md" >
                                        <option value={2}>SE</option>
                                        <option value={3}>TE</option>
                                        <option value={4}>BE</option>
                                    </select>
                                    <select name='div' value={form.div} onChange={(event) => addLab(event, index)} className="border p-2 rounded-md" >
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                    </select>
                                    <select name='batch' value={form.batch} onChange={(event) => addLab(event, index)} className="border p-2 rounded-md" >
                                        <option value='K'>K</option>
                                        <option value='L'>L</option>
                                        <option value='M'>M</option>
                                        <option value='N'>N</option>
                                    </select>
                                    <select name='sub' value={form.sub} onChange={(event) => addLab(event, index)} className="border p-2 rounded-md" >
                                        <option value="1">Proffesor</option>
                                        <option value="2">Associate</option>
                                        <option value="3">Assistant</option>
                                    </select>
                                    { <button onClick={() => { remlab(index) }} className="text-red-500"><IoRemoveCircleOutline size={30} /></button>}
                                </li>
                            )
                        })}

                        <li >
                            <button onClick={() => { addNewLabs() }} className="bg-green-500 text-white p-1 rounded-md"><IoIosAddCircleOutline size={30} /></button>

                        </li>

                        <li className="mt-4">
                            <button type="submit" className='btn bg-blue-500 text-white p-2 px-4 rounded-md'>
                                Submit
                            </button>
                        </li>



                    </ul>
                </form>
            </div>
        </div >
    );
}

export default AddInfo;