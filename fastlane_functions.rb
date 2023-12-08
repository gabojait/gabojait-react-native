require 'dotenv/load'

def handle_semantic_version_number(bump_type: nil, os_hotfix_version: nil)
  ios_hotfix_version = ENV['IOS_HOTFIX_VERSION']
  android_hotfix_version = ENV['ANDROID_HOTFIX_VERSION']

  if ["major", "minor", "patch"].include?(bump_type) and [ios_hotfix_version, android_hotfix_version].include?(os_hotfix_version)
    increment_version_number(bump_type: bump_type, xcodeproj: "gabojait.xcodeproj")
    new_version_number = get_version_number(xcodeproj: "gabojait.xcodeproj")
    update_package_version(new_version_number)
    initialize_hotfix_number(os_hotfix_version)
  elsif bump_type.nil?
    # bump_type이 주어지지 않은 경우
    puts "Error: Bump type is required."
  elsif os_hotfix_version.nil?
    puts "Error: os type is required"
  else
    # 유효하지 않은 bump_type
    puts "Error: Invalid bump type or os_hotfix_version property in package.json. Supported types are major, minor, and patch."
  end
end

def update_package_version(new_version)
  path = '../../package.json'
  data = read_and_parse_json(path)
  renew_package_version(new_version)
  data['version'] = "^#{new_version}"
  updated_data = JSON.pretty_generate(data)

  write_updated_json(path, updated_data)
end

def increment_hotfix_number(os_hotfix_version)
  path = '../../package.json'
  data = read_and_parse_json(path)
  hotfix_version = data[os_hotfix_version].to_i
  data[os_hotfix_version] = (hotfix_version + 1).to_s
  updated_data = JSON.pretty_generate(data)

  write_updated_json(path, updated_data)
  puts "hotfix_version updated from #{hotfix_version} to #{data[os_hotfix_version]} in #{path}"
end

def initialize_hotfix_number(property)
  path = '../../package.json'
  data = read_and_parse_json(path)
  data[property] = "0"
  updated_data = JSON.pretty_generate(data)

  write_updated_json(path, updated_data)
  puts "#{property} initialized to #{data[property]} in #{path}"
end

def renew_package_version(new_version)
  path = '../../package.json'
  data = read_and_parse_json(path)
  current_version = data['version'].scan(/\d+/).map(&:to_i)
  renew_version = higher_version(current_version, new_version)
  return renew_version
end

def higher_version(a, b)
  version_a = Gem::Version.new(a)
  version_b = Gem::Version.new(b)

  if version_a > version_b
    return a
  elsif version_a <= version_b
    return b
  end
end

def read_and_parse_json(file_path)
  json_data = File.read(file_path)
  JSON.parse(json_data)
end

def write_updated_json(file_path, updated_json_data)
  # 파일에 쓰기
  File.open(file_path, 'w') do |file|
    file.puts(updated_json_data)
  end
end