import React from 'react';
import styles from './table.module.css';

interface TableComponentProps {
    headers: string[];
    data: string[][];
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, data }) => {
    return (
        <table className={styles['embossed-table']}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
