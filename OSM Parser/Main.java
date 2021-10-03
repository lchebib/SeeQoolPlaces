import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Scanner;

public class Main {
	
	private static Scanner scanner; 

	public static void fileParser(String inputFilepath, String outputFilename) throws Exception {

		File inputFile = new File(inputFilepath);
		FileReader fileReader = new FileReader(inputFile);
		BufferedReader bufferedReader = new BufferedReader(fileReader);
		
		File outputFile = new File(outputFilename);
		FileWriter fileWriter = new FileWriter(outputFile);
		BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);		

		String line;
		
//		// only parse first 10 lines for debugging
//		for (int i = 0; i < 10; i++) {	
//			line = bufferedReader.readLine();
		
		while ((line = bufferedReader.readLine()) != null) {

			String[] fields = line.split("\\|");

			for (int col = 1; col < fields.length && col < 6; col++) {	// only extract relevant fields
				String field = fields[col] + ",";				
				bufferedWriter.write(field);
			}
			
			bufferedWriter.write("\n");
		}

		fileReader.close();
		bufferedReader.close();
		
		fileWriter.flush();
		bufferedWriter.flush();
		fileWriter.close();
		bufferedWriter.close();
	}

	public static void main(String[] args) {
		
		scanner = new Scanner(System.in);
		
		while (true) {
			
			System.out.print("Enter .osm.csv filepath (file must be in same folder as this program): ");
			String inputFile = scanner.nextLine();
			
			System.out.print("Enter output filename (without the file extension, e.g. \"csvParsed\"): ");
			String outputFile = scanner.nextLine() + ".csv";

			try {
				fileParser(inputFile, outputFile);
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("File IO Error!\n");
			}	
			
			System.out.println("\nFile parsed!\n");
		}
	}
}
