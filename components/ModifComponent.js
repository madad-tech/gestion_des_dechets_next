import React, { useState } from 'react';
import Link from 'next/link';
const ConteneurComponent = ({role,data}) => {
   
  
   
   
  return  <tr>
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-left font-medium text-500">{data.user}</div>
	  </td>
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-lg text-center">{data.shema}</div>
	  </td>
	  
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-lg text-center">{data.key}</div>
	  </td> 
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-lg text-center">{data.old}</div>
	  </td>
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-lg text-center">{data.new}</div>
	  </td>
	  <td className="p-2 whitespace-nowrap">
		  <div className="text-lg text-center">{data.date!=undefined && data.date.substring(0,10)}</div>
	  </td>
	  
	</tr>;
};

export default ConteneurComponent;
