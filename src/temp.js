return (
    <div className="max-w-4xl mx-auto p-8 border rounded-md shadow-md my-8">
        <h1 className="text-2xl font-bold mb-4">AddInfo</h1>
        <div className="Tdetails">
            <form onSubmit={(event) => { submit(event) }}>
                    <li className="flex items-center space-x-4">
                        <label className="w-1/4">Teacher Id :</label>
                        <input
                            type="number" required
                            value={tid}
                            onChange={(e) => setID(e.target.value)}
                            placeholder=" Enter Id "
                            className="w-3/4 border p-2 rounded-md"
                        />
                    </li>
                    <li className="flex items-center space-x-4">
                        <label className="w-1/4">Name :</label>
                        <input
                            type="text" required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" Enter Name"
                            className="w-3/4 border p-2 rounded-md"
                        />
                    </li>
                    <li className="flex items-center space-x-4">
                        <label className="w-1/4">Position :</label>
                        <select value={pos} onChange={(e) => setPos(e.target.value)} className="w-3/4 border p-2 rounded-md">
                            <option value="1">Proffesor</option>
                            <option value="2">Associate</option>
                            <option value="3">Assistant</option>
                        </select>
                    </li>

                    <li className="space-y-2">
                        <label className="block">Add Subjects :</label>
                        {lect.map((form, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <select
                                    placeholder="Enter Year" name='year'
                                    value={form.year}
                                    onChange={(event) => { addSubject(event, index); changeSub(index) }}
                                    className="border p-2 rounded-md"
                                >
                                    {subdata.map((subdata) => (
                                        <option key={subdata.year} value={subdata.year}>{subdata.year}</option>
                                    ))}
                                </select>
                                <select
                                    placeholder="Enter SEM" name='sem'
                                    value={form.sem}
                                    onChange={(event) => { addSubject(event, index); changeSub(index) }}
                                    className="border p-2 rounded-md"
                                >
                                    <option value={1}>SEM 1</option>
                                    <option value={2}>Sem 2</option>
                                </select>
                                <select
                                    placeholder="Enter Division" name='div'
                                    value={form.div}
                                    onChange={(event) => addSubject(event, index)}
                                    className="border p-2 rounded-md"
                                >
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                </select>
                                <select
                                    name='sub' value={form.sub}
                                    onChange={(event) => addSubject(event, index)}
                                    className="border p-2 rounded-md"
                                >
                                    {sub.map((subdata) => (
                                        <option key={subdata} value={subdata}>{subdata}</option>
                                    ))}
                                </select>
                                {!(lect.length === 1) && <button onClick={() => { remSubject(index) }} className="text-red-500"><IoRemoveCircleOutline size={30} /></button>}
                            </div>
                        ))}
                        <button onClick={() => { addNewSubs() }} className="mt-4 bg-green-500 text-white p-2 rounded-md"><IoIosAddCircleOutline size={30} /></button>
                    </li>

                    <li className="space-y-2">
                        <label className="block">Add Labs :</label>
                        {lab.map((form, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <select
                                    name='year' value={form.year}
                                    onChange={(event) => addLab(event, index)}
                                    className="border p-2 rounded-md"
                                >
                                    <option value={2}>SE</option>
                                    <option value={3}>TE</option>
                                    <option value={4}>BE</option>
                                </select>
                                {/* ... (other select dropdowns) */}
                                {!(lab.length === 1) && <button onClick={() => { remlab(index) }} className="text-red-500"><IoRemoveCircleOutline size={30} /></button>}
                            </div>
                        ))}
                        <button onClick={() => { addNewLabs() }} className="mt-4 bg-green-500 text-white p-2 rounded-md"><IoIosAddCircleOutline size={30} /></button>
                    </li>

                    <li className="mt-4">
                        <input className='btn bg-blue-500 text-white p-2 rounded-md' type="submit" />
                    </li>
            </form>
        </div>
    </div>
);
