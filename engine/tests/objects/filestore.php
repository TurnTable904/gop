<?php
/**
 * Elgg Test Skeleton
 *
 * @package Elgg
 * @subpackage Test
 * @author Curverider Ltd
 * @link http://elgg.org/
 */
class ElggCoreFilestoreTest extends ElggCoreUnitTest {

	/**
	 * Called before each test object.
	 */
	public function __construct() {
		parent::__construct();
		
		// all code should come after here
	}

	/**
	 * Called before each test method.
	 */
	public function setUp() {
		$this->filestore = new ElggDiskFilestoreTest();
	}

	/**
	 * Called after each test method.
	 */
	public function tearDown() {
		// do not allow SimpleTest to interpret Elgg notices as exceptions
		$this->swallowErrors();
		
		unset($this->filestore);
	}

	/**
	 * Called after each test object.
	 */
	public function __destruct() {
		// all code should go above here
		parent::__destruct();
	}

	public function testFileMatrix() {
		global $CONFIG;
		
		// create a test user
		$user = $this->createTestUser();
		$created = date('Y/m/d', $user->time_created);
		
		// check matrix with username
		$user_dir = $this->filestore->make_file_matrix($user->username);
		$this->assertIdentical($user_dir, "f/i/l/e/T/fileTest/");
		
		// check matrix with guid
		$guid_dir = $this->filestore->make_file_matrix($user->guid);
		$this->assertIdentical($guid_dir, "$created/$user->guid/");
		
		// clean up user
		$user->delete();
	}
	
	public function testFilenameOnFilestore() {
		global $CONFIG;
		
		// create a user to own the file
		$user = $this->createTestUser();
		$created = date('Y/m/d', $user->time_created);
		
		// setup a test file; no need to save
		$file = new ElggFile();
		$file->owner_guid = $user->guid;
		$file->setFilename('testing/filestore.txt');
		
		// ensure filename and path is expected
		$filename = $file->getFilenameOnFilestore($file);
		$filepath = "$CONFIG->dataroot$created/$user->guid/testing/filestore.txt";
		$this->assertIdentical($filename, $filepath);
		
		// clean up user
		$user->delete();
	}


	protected function createTestUser($username = 'fileTest') {
		$user = new ElggUser();
		$user->username = $username;
		$guid = $user->save();
		
		// load user to have access to creation time
		return get_entity($guid);
	}
}

class ElggDiskFilestoreTest extends ElggDiskFilestore {
	public function make_file_matrix($filename) {
		return parent::make_file_matrix($filename);
	}
	
	public function user_file_matrix($guid) {
		return parent::user_file_matrix($guid);
	}
}
