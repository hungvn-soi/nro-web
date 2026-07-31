interface Row {
    current: string;
    require: string;
    next: string;
    bonus: string;
}

interface Props {
    rows: Row[];
}

export default function GuideTable({
    rows,
}: Props) {
    return (
        <div className="overflow-auto rounded-xl border border-zinc-800">

            <table className="w-full">

                <thead className="bg-zinc-900">

                    <tr className="text-amber-200">

                        <th className="p-4 text-left">
                            Đệ hiện tại
                        </th>

                        <th className="p-4 text-left">
                            Điều kiện
                        </th>

                        <th className="p-4 text-left">
                            Tiến hóa
                        </th>

                        <th className="p-4 text-left">
                            Hợp thể
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {rows.map((row, index) => (

                        <tr
                            key={index}
                            className="border-t border-zinc-800 text-white"
                        >

                            <td className="p-4">
                                {row.current}
                            </td>

                            <td className="p-4">
                                {row.require}
                            </td>

                            <td className="p-4">
                                {row.next}
                            </td>

                            <td className="p-4 text-yellow-400 font-semibold">
                                {row.bonus}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}