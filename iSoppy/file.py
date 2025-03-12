import os
from tkinter import Tk, filedialog

# Function to decompress iSilo's LZ77-based compression
def isilo_decompress(data):
    """Decompresses data using iSilo's LZ77-based algorithm."""
    decompressed = []
    i = 0

    try:
        while i < len(data):
            byte = data[i]
            i += 1

            if byte < 0x80:  # Literal byte
                decompressed.append(byte)
            elif i < len(data) - 1:  # Back-reference
                length = (byte & 0x7F) + 3  # Get length (bits 0-6)
                distance = data[i]
                i += 1

                # Ensure distance is within bounds
                if distance > len(decompressed):
                    print(f"Decompression error: distance {distance} exceeds decompressed data size {len(decompressed)}")
                    break

                # Copy 'length' bytes from 'distance' offset in decompressed data
                for _ in range(length):
                    decompressed.append(decompressed[-distance])
            else:
                print("Decompression error: unexpected end of data.")
                break

        return bytes(decompressed).decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"Decompression failed: {e}")
        return "[Decompression Error]"

# Function to parse iSilo PDB file
def parse_isilo_pdb(file_path):
    try:
        with open(file_path, "rb") as f:
            # Read the PDB header (78 bytes)
            header = f.read(78)
            name = header[:32].decode("ascii", errors="ignore").strip("\x00")
            num_records = int.from_bytes(header[76:78], byteorder="big")

            print(f"File Name: {name}")
            print(f"Number of Records: {num_records}")

            # Read record offsets
            record_offsets = []
            for _ in range(num_records):
                record_offset = int.from_bytes(f.read(4), byteorder="big")
                record_offsets.append(record_offset)
                f.read(4)  # Skip unique ID

            # Add end of file as the last offset
            record_offsets.append(os.fstat(f.fileno()).st_size)
            print(f"Record Offsets: {record_offsets}")

            # Extract and decompress records
            content = ""
            for i in range(num_records):
                try:
                    start = record_offsets[i]
                    end = record_offsets[i + 1]
                    f.seek(start)
                    record_data = f.read(end - start)

                    print(f"Reading record {i + 1}/{num_records}, Size: {len(record_data)} bytes")
                    decompressed_data = isilo_decompress(record_data)
                    content += decompressed_data
                except Exception as record_error:
                    print(f"Error reading or decompressing record {i + 1}: {record_error}")
                    content += f"[Error in Record {i + 1}]"

            return content
    except Exception as e:
        print(f"Error parsing iSilo PDB file: {e}")
        return "[File Parsing Error]"

# GUI for file selection
def select_file_and_read():
    root = Tk()
    root.withdraw()  # Hide the main Tkinter window

    print("Select an iSilo PDB file to read...")
    file_path = filedialog.askopenfilename(filetypes=[("PDB Files", "*.pdb")])

    if file_path:
        print(f"\nSelected File: {file_path}")
        try:
            content = parse_isilo_pdb(file_path)
            print("\n--- File Content ---\n")
            print(content[:500])  # Limit output to avoid crashing on huge content
        except Exception as e:
            print(f"\nAn error occurred while processing the file: {e}")
    else:
        print("No file selected.")

# Run the program
if __name__ == "__main__":
    select_file_and_read()
