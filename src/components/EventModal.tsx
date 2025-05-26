import { useState } from "react";
import { type EventModalProps } from "../types/modal";
import Modal from "./Modal";
import CustomSelect from "./CustomSelect";
import { OptionType } from "../types/select";
import { SingleValue } from "react-select";

enum TypeOfFilters {
  query = "query",
  type = "type",
  year = "year",
  month = "month",
  location = "location",
}

const EventModal = ({ isOpen, close }: EventModalProps) => {
  const [filters, setFilters] = useState({
    [TypeOfFilters.query]: "",
    [TypeOfFilters.type]: { value: "", label: "Type" },
    [TypeOfFilters.year]: { value: "", label: "Year" },
    [TypeOfFilters.month]: { value: "", label: "Month" },
    [TypeOfFilters.location]: { value: "", label: "Location" },
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === "string" && value) {
        params.append(key, value);
      } else if (typeof value === "object" && value.value) {
        params.append(key, value.value);
      }
    });

    console.log("Los filtros son: ", filters); // Una cadena vacía no se envía al servidor
    console.log("Parámetro de Consulta formado: ", params.toString());
    console.log(`URL: http://localhost:8000?${params.toString()}`);
    alert(
      `Enviando la solicitud a: http://localhost:8000?${params.toString()}`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Se escribió: ", e.target.value);

    setFilters((prev) => ({ ...prev, [TypeOfFilters.query]: e.target.value }));
  };

  const handleFilterChange = ({
    name,
    selectedOption,
  }: {
    name: keyof typeof TypeOfFilters;
    selectedOption: SingleValue<OptionType>;
  }) => {
    console.log("El name de la opción seleccioanda es: ", name);
    console.log("Opción seleccionada:", selectedOption);

    setFilters((prev) => ({ ...prev, [name]: { ...selectedOption } }));
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Actualizando datos.");
  };

  const removeFilters = () => {
    setFilters({
      [TypeOfFilters.query]: "",
      [TypeOfFilters.type]: { value: "", label: "Type" },
      [TypeOfFilters.year]: { value: "", label: "Year" },
      [TypeOfFilters.month]: { value: "", label: "Month" },
      [TypeOfFilters.location]: { value: "", label: "Location" },
    });
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-6 flex-wrap">
          {/* Búsqueda */}
          <form onSubmit={handleSearch} className="flex items-center gap-6">
            <input
              type="text"
              name={TypeOfFilters.query}
              value={filters[TypeOfFilters.query]}
              placeholder="Event name"
              className="outline-0 border py-2 px-4 rounded"
              onChange={handleInputChange}
            />

            {/* Filtros */}
            <div className="flex items-center gap-6">
              <CustomSelect
                name={TypeOfFilters.type}
                options={[
                  { value: "", label: "Type" },
                  { value: "Tipo 1", label: "Tipo 1" },
                  { value: "Tipo 2", label: "Tipo 2" },
                  { value: "Tipo 3", label: "Tipo 3" },
                ]}
                value={filters[TypeOfFilters.type]}
                onChange={(selected) =>
                  handleFilterChange({
                    name: TypeOfFilters.type,
                    selectedOption: selected,
                  })
                }
              />
              <CustomSelect
                name={TypeOfFilters.year}
                options={[
                  { value: "", label: "Year" },
                  { value: "2023", label: "2023" },
                  { value: "2024", label: "2024" },
                  { value: "2025", label: "2025" },
                ]}
                value={filters[TypeOfFilters.year]}
                onChange={(selected) =>
                  handleFilterChange({
                    name: TypeOfFilters.year,
                    selectedOption: selected,
                  })
                }
              />
              <CustomSelect
                name={TypeOfFilters.month}
                options={[
                  { value: "", label: "Month" },
                  { value: "Enero", label: "Enero" },
                  { value: "Febrero", label: "Febrero" },
                  { value: "Marzo", label: "Marzo" },
                ]}
                value={filters[TypeOfFilters.month]}
                onChange={(selected) =>
                  handleFilterChange({
                    name: TypeOfFilters.month,
                    selectedOption: selected,
                  })
                }
              />
              <CustomSelect
                name={TypeOfFilters.location}
                options={[
                  { value: "", label: "Location" },
                  { value: "Ventanilla", label: "Ventanilla" },
                  { value: "Santa Anita", label: "Santa Anita" },
                  { value: "San Miguel", label: "San Miguel" },
                ]}
                value={filters[TypeOfFilters.location]}
                onChange={(selected) =>
                  handleFilterChange({
                    name: TypeOfFilters.location,
                    selectedOption: selected,
                  })
                }
              />
            </div>

            <button className="bg-interactive-blue text-white py-2 px-6 rounded shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-600">
              Search
            </button>
          </form>

          <div>
            <button
              className="bg-interactive-blue text-white py-2 px-6 rounded shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-600"
              onClick={removeFilters}
            >
              Remove filters
            </button>
          </div>

          <form onSubmit={handleUpdate}>
            <button className="bg-interactive-blue text-white py-2 px-6 rounded shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-600">
              Update
            </button>
          </form>

          <div>
            <button className="bg-interactive-blue text-white py-2 px-6 rounded shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-600">
              Download
            </button>
          </div>
        </div>

        {/* Tabla */}
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="text-center">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">File URL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">User logged in</td>
              <td className="border px-4 py-2">Caída</td>
              <td className="border px-4 py-2">2025-25-03 08:15:32</td>
              <td className="border px-4 py-2">Parque El Olivar</td>
              <td className="border px-4 py-2">https://example.com/log1.txt</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">User logged in</td>
              <td className="border px-4 py-2">Caída</td>
              <td className="border px-4 py-2">2025-25-03 08:15:32</td>
              <td className="border px-4 py-2">Parque El Olivar</td>
              <td className="border px-4 py-2">https://example.com/log1.txt</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">User logged in</td>
              <td className="border px-4 py-2">Caída</td>
              <td className="border px-4 py-2">2025-25-03 08:15:32</td>
              <td className="border px-4 py-2">Parque El Olivar</td>
              <td className="border px-4 py-2">https://example.com/log1.txt</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">User logged in</td>
              <td className="border px-4 py-2">Caída</td>
              <td className="border px-4 py-2">2025-25-03 08:15:32</td>
              <td className="border px-4 py-2">Parque El Olivar</td>
              <td className="border px-4 py-2">https://example.com/log1.txt</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">User logged in</td>
              <td className="border px-4 py-2">Caída</td>
              <td className="border px-4 py-2">2025-25-03 08:15:32</td>
              <td className="border px-4 py-2">Parque El Olivar</td>
              <td className="border px-4 py-2">https://example.com/log1.txt</td>
            </tr>
          </tbody>
        </table>

        {/* Paginado */}
        <div className="flex flex-col items-center gap-1">
          <p>Existen 300 eventos registrados.</p>
          <p>Límite de eventos a mostrar: 100</p>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
